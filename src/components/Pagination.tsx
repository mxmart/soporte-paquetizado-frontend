'use client';
import React from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { AiOutlineVerticalLeft, AiOutlineVerticalRight } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    totalItems: number;
    minItems: number;
    itemsInPage?: number;
    itemsPerPage?: number;
}

export const Pagination = ({ totalItems = 0, minItems = 10, itemsInPage = 0, itemsPerPage = 10 }: Props) => {

    const pathName = usePathname();
    const totalPages: number = Math.ceil(totalItems / itemsPerPage);
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN( Number(pageString) ) ? 1 : Number( pageString );
    const { push } = useRouter();

    const createPageUrl = ( pageNumber: number | string ) => {
        const params = new URLSearchParams( searchParams );

        if( pageNumber === '...' ) return `${ pathName }?${ params.toString() }`; 
        if( Number(pageNumber) <= 0 ) return `${ pathName }?page=1`;
        if( Number(pageNumber) > totalPages ) return `${ pathName }?${ params.toString() }`;

        params.set('page', pageNumber.toString());
        return `${ pathName }?${ params.toString() }`;
    }

    return (
        <div className={`notification ${ totalItems <= minItems ? 'hidden' : 'flex' } items-center gap-1 mt-8 mb-4 justify-end pr-12 text-gray-600`}>
            <AiOutlineVerticalRight onClick={ () => push( createPageUrl( 1 )) } className="pagination-info text-lg cursor-pointer" />
            <MdKeyboardArrowLeft onClick={ () => push( createPageUrl( currentPage - 1 )) } className="pagination-info text-2xl cursor-pointer" />
            <p className="pagination-info text-xs font-medium" >{ itemsInPage } de { currentPage } - { totalPages }</p>
            <MdKeyboardArrowRight onClick={ () => push( createPageUrl( currentPage + 1 )) } className="pagination-info text-2xl cursor-pointer" />
            <AiOutlineVerticalLeft onClick={ () => push( createPageUrl( totalPages )) } className="pagination-info text-lg cursor-pointer" />
        </div>
    )
}