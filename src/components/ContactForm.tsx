'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CtaButton from '@/components/CtaButton';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setFormSubmitted(true);
    reset();

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="border border-white/10 bg-white/5 p-6 md:p-8">
      <h2 className="mb-6 text-center font-display text-2xl font-bold text-white">Envíanos un mensaje</h2>

      {formSubmitted ? (
        <div className="mb-6 border border-teal/40 bg-teal/10 p-4 text-center text-white">
          <p>Gracias por tu mensaje. Te responderemos pronto.</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-white/85">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className={`w-full rounded-md border bg-brand-soft px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet ${
              errors.name ? 'border-pink' : 'border-white/15'
            }`}
            placeholder="Tu nombre"
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-pink-soft">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-white/85">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded-md border bg-brand-soft px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet ${
              errors.email ? 'border-pink' : 'border-white/15'
            }`}
            placeholder="tu@correo.com"
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo no válido',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-pink-soft">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-white/85">
            Asunto
          </label>
          <input
            id="subject"
            type="text"
            className={`w-full rounded-md border bg-brand-soft px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet ${
              errors.subject ? 'border-pink' : 'border-white/15'
            }`}
            placeholder="¿En qué podemos ayudarte?"
            {...register('subject', { required: 'El asunto es obligatorio' })}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-pink-soft">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-white/85">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full rounded-md border bg-brand-soft px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet ${
              errors.message ? 'border-pink' : 'border-white/15'
            }`}
            placeholder="Escribe tu mensaje..."
            {...register('message', {
              required: 'El mensaje es obligatorio',
              minLength: {
                value: 10,
                message: 'El mensaje debe tener al menos 10 caracteres',
              },
            })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-pink-soft">{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <CtaButton as="button" type="submit" icon="mail">
            Enviar mensaje
          </CtaButton>
        </div>
      </form>
    </div>
  );
}
