'use server'

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"


async function getBalance(): Promise<{ balance?: number,  error?: string }> {
  const {userId} = auth()

  if (!userId) {
    return { error: 'User not found' }
  } 

  try {
      const balance = await db.transaction.aggregate({
        _sum: {
          amount: true
        },
        where: {
          userId
        }
      })
      
      return { balance: balance._sum.amount || 0 }
  } catch (error) {
    return { error: 'Something went wrong while fetching balance' }      
  }

  
  
}

export default getBalance
