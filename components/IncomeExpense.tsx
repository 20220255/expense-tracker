import getIncomeExpense from "@/app/actions/getIncomeExpense"
import { numbersWithCommas } from "@/lib/utils"


const IncomeExpense = async () => {

    const {income, expense} = await getIncomeExpense()

    const incomeWithCommas = numbersWithCommas(income ?? 0)

    const expenseWithCommas = numbersWithCommas(expense ?? 0)



    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">${incomeWithCommas}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">${expenseWithCommas}</p>
            </div>
        </div>
    )
}

export default IncomeExpense
