'use client'

import deleteTransaction from "@/app/actions/deleteTransaction"
import { numbersWithCommas } from "@/lib/utils"
import { Transaction } from "@/types/Transaction"
import { toast } from "react-toastify"


const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const sign = transaction.amount < 0 ? '-' : '+'
    const handleDeleteTransaction = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this transaction?')

        if (!confirmed) {
            return
        }

        const {message, error} = await deleteTransaction(id)

        if (error) {
            toast.error (error)
            return
        }
        toast.success(message)
        
    }
    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text}: <span> {sign}${numbersWithCommas(Math.abs(transaction.amount))}</span>
            <button className="delete-btn" onClick={() => handleDeleteTransaction(transaction.id)}>x</button> 
        </li>
    )
}

export default TransactionItem

