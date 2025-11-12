'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ModeToggle } from './mode-toggle'; // Assumindo que o ModeToggle está no mesmo diretório ou em um import relativo

// TIPOS: Mantemos o mínimo para uma Navbar de Aplicação
export interface UserNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoSrc?: string;
  logoAlt?: string;
  title?: string;
  // Podemos adicionar mais elementos de dashboard/usuário aqui, se necessário
}

export const Navbar = React.forwardRef<HTMLElement, UserNavbarProps>(
  (
    {
      className,
      logoSrc = '/mid.svg', // Default baseado no seu código anterior
      logoAlt = 'MidFalconi Logo',
      title = 'User Management',
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        // Aplica o fundo com blur e sticky/fixed para o topo
        className={cn(
          'sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300',
          'border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80',
          className
        )}
        {...props}
      >
        <div 
          // Centraliza e define a largura máxima, ajusta a altura
          className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 pr-8"
        >
          {/* Lado Esquerdo: Logo e Título da Aplicação */}
          <Link href={"/"} className="flex items-center gap-3 group">
            
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={40}
              height={40}
              className="invert dark:invert-0 transition-transform duration-300 group-hover:scale-105"
            />
            
            <span className="font-semibold text-xl tracking-wide text-gray-900 dark:text-gray-100 transition-colors duration-300">
              {title}
            </span>
          </Link>

          {/* Lado Direito: Ações (Mode Toggle) */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            {/* Espaço para um botão de Perfil/Notificações, se necessário */}
          </div>
        </div>
      </header>
    );
  }
);