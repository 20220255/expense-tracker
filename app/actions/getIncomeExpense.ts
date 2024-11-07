'use server'

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"


async function getIncomeExpense(): Promise<{ income?: number, expense?: number, error?: string }> {
  const {userId} = auth()

  if (!userId) {
    return { error: 'User not found' }
  } 

  try {
      
    const income = await db.transaction.aggregate({
        _sum: {
          amount: true
        },
        where: {
          userId,
          amount: {
            gt: 0
          }
        }
      })

    const expense = await db.transaction.aggregate({
        _sum: {
          amount: true
        },
        where: {
          userId,
          amount: {
            lt: 0
          }
        }
      })

      return { income: income._sum.amount || 0, expense: Math.abs(expense._sum.amount || 0)  }
      
  } catch (error) {
    return { error: 'Something went wrong while fetching balance' }      
  }

  
  
}

export default getIncomeExpense
