'use client'
import React from 'react'
import { UploadCoverImage } from './UploadCoverImage'
import { useForm } from 'react-hook-form'
import { UploadLogo } from './UploadLogo';
import { useQuery } from '@tanstack/react-query';
import { getLogo } from '@/services';

type Inputs = {
    coverImage: string;
    logo: string;
};

export const AppearancePage = () => {

  const { setValue } = useForm<Inputs>();
  const { data: logo, isLoading: isLoadingLogo } = useQuery({ queryKey: ['platformLogo'], queryFn: getLogo });

  return (
    <div className='w-full configuration-page'>
        <UploadCoverImage
            name='logo'
            setValue={ setValue }
        />
        <UploadLogo
            name='coverImage'
            setValue={ setValue }
            image={ logo }
            isLoading={ isLoadingLogo }
        />
    </div>
  )
}
  