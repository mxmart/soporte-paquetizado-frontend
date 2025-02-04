import { Row, flexRender } from '@tanstack/react-table';
import { useEffect, useRef } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';


interface Props{
    row:Row<any>;
    amount_paid:any;
    setTotalAmount:any;
    totalAmount:number;
    setPaymentCounter:any;
    setAmount:any;
    register:any;
    setValue: UseFormSetValue<any>
    getValues: UseFormGetValues<any>
    watch:any;
    indexRow:number;
    setPaymentsCompletedCounter:any;
}

export const StateRow = ({row, amount_paid, setTotalAmount, totalAmount, setPaymentCounter, register, setAmount, getValues, setValue, watch, indexRow, setPaymentsCompletedCounter}:Props) => {

    const lastValue = useRef(0);
    const touched = useRef(false);

    
    useEffect(() => {
        if(Number(watch(`payments.payment.${indexRow}.payment`)) != 0){
            setValue(`payments.payment.${indexRow}.touched`,true);
        }else{
            setValue(`payments.payment.${indexRow}.touched`,false);
        }
        if(!watch(`payments.payment.${indexRow}.touched`) && watch(`payments.payment.${indexRow}.touched`) != touched.current){
            setPaymentCounter(-1);
            touched.current = false;
        }
        if(watch(`payments.payment.${indexRow}.touched`) && watch(`payments.payment.${indexRow}.touched`) != touched.current){
            touched.current = true;
            setPaymentCounter(1);
          }

        if(watch(`payments.payment.${indexRow}.payment`) !== lastValue.current){
            const i = watch(`payments.payment.${indexRow}.payment`) - lastValue.current;
            lastValue.current = watch(`payments.payment.${indexRow}.payment`);
            setTotalAmount(totalAmount + i)
        }
        lastValue.current = watch(`payments.payment.${indexRow}.payment`);
        if(watch(`payments.payment.${indexRow}.payment`) === watch(`payments.payment.${indexRow}.pending`)){
            setValue(`payments.payment.${indexRow}.valid`,true)
        }else{
            setValue(`payments.payment.${indexRow}.valid`,false)
        }
        setPaymentsCompletedCounter();

    }, [watch(`payments.payment.${indexRow}.payment`)]);

    useEffect(() => {
        setValue(setAmount,"0");
        setValue(`payments.payment.${indexRow}.valid`,false)
        setValue(`payments.payment.${indexRow}.touched`,false);
        touched.current = false;
        lastValue.current = 0;
    }, [amount_paid]);


    const operation = () =>{
        if((getValues(`payments.payment.${indexRow}.pending`) - watch(`payments.payment.${indexRow}.payment`))<0)
            return "MXN $0"
        return <p>MXN<br/>${(getValues(`payments.payment.${indexRow}.pending`) - watch(`payments.payment.${indexRow}.payment`))}</p>
    }

    
    return (
        <>
            <tr key={row.id} className=' cursor-pointer '>
                { row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className={`text-center py-[6px] ${ index === 0 && 'rounded-s-lg' } ${ index === 4 && 'rounded-r-lg' }`}>
                {cell.column.id === "payment" 
                  ? <>
                    < input
                            { ...register(`${ setAmount }`,{
                                pattern:{
                                    value:/^[0-9]+$/
                                }
                            }) }
                            className='w-20 text-center focus:outline-none' 
                            type='number' 
                            key={cell.column.id} 
                            // onChange={handleChange} 
                            // value={newPayment}
                            /> 
                        </>
                  : cell.column.id === "remaining"  
                    ? operation()
                    : cell.column.id === "pending" ? <p>MXN<br/>${(watch(`payments.payment.${indexRow}.pending`))}</p>
                    : flexRender(cell.column.columnDef.cell, cell.getContext())

                }
              </td>
            ))}
          </tr>
        </>
    )
}