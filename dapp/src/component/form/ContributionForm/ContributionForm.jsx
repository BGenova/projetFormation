import React from 'react';
import { useForm } from 'react-hook-form';
import { ethers } from 'ethers';

const ConversionForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

    const onSubmit = (data) => {
        const { value, currency } = data;

        const valueInWei = ethers.utils.parseUnits(value, currency);
        const valueInGwei = ethers.utils.formatUnits(valueInWei, 'gwei');
        const valueInEther = ethers.utils.formatEther(valueInWei);

        console.log('Value in Wei:', valueInWei.toString());
        console.log('Value in Gwei:', valueInGwei);
        console.log('Value in Ether:', valueInEther);
    };

    const value = watch('value');
    const currency = watch('currency');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="value">Value</label>
                <input
                    type="number"
                    id="value"
                    {...register('value')}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                />
                {errors.value && (
                    <p className="text-red-500">{errors.value.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="currency">Currency</label>
                <select id="currency" {...register('currency')} className="mt-1 block w-full border-gray-300 rounded-md">
                    <option value="wei">Wei</option>
                    <option value="gwei">Gwei</option>
                    <option value="ether">Ether</option>
                </select>
            </div>

            <div>
                <p>Value in Gwei: {value && ethers.utils.formatUnits(ethers.utils.parseUnits(value, currency), 'gwei')}</p>
                <p>Value in Ether: {value && ethers.utils.formatEther(ethers.utils.parseUnits(value, currency))}</p>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ConversionForm;
