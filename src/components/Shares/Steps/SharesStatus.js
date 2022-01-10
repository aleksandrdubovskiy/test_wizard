import * as React from "react";

export function SharesStatus({delta}) {
    return <div>
        {delta > 0 && `${delta} shares for distributing`}
        {delta === 0 && "All shares distributed"}
        {delta < 0 && `Overusing ${delta} shares`}
    </div>;
}