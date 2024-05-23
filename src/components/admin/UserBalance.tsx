import { userBalance } from '@/lib/actions/profileActions'
import React from 'react'

export const UserBalance = async ({id}:{id: string | undefined}) => {

    const balance = await userBalance({id})
    
    return (
        <div className='w-full py-3'>
            <div className='text-xl font bold'>
            <h3>Account Balance</h3>
            <h3>
                ${ balance.toStrngLocale() }
            </h3>
            </div>
        </div>
    )
}

export default UserBalance