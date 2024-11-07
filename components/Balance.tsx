

import getBalance from "@/app/actions/getBalance"
import { numbersWithCommas } from "@/lib/utils"


const Balance = async() => {

    const { balance } = await getBalance()
    console.log(balance)

    return (
        <>
            <h4>Your Balance</h4>
            <h1>${numbersWithCommas(Number(balance?.toFixed(2))) ?? 0.00}</h1>

        </>
    )
}

export default Balance
