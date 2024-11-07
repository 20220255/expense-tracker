'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}  

async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get('text')
    const amountValue = formData.get('amount')
    
    // Check for invalid data
    if (!textValue || textValue==='' || !amountValue ) {
        return { error: 'Please enter text and/or amount' }
    }

    // Make sure the text is a string and amount is float
    const text: string = textValue.toString()
    const amount: number = parseFloat(amountValue.toString())
    
    // Get logged in user
    const {userId} =  auth()

    // Check for user
    if (!userId) {
        return { error: 'User not found' }
    }
    
    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        })

        // Revalidate the page or refreh the page
        revalidatePath('/')

        return { data: transactionData }
    } catch (error) {
        return { error: 'Error adding transaction' }
    }


    
}

export default addTransaction