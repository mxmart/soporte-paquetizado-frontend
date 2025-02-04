'use client';
import React, { useEffect, useRef, useState } from 'react'

export const useClickOutside = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<any>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if( !menuRef?.current?.contains( e?.target ) ){
                setIsOpen(false);
            }
        };
  
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

  return {
    setIsOpen,
    isOpen,
    menuRef,

  }
}
