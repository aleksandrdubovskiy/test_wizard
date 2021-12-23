import StepHeader from "./Steps/Header/StepHeader";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import {useState} from "react";
import StepFooter from "./Steps/Footer/StepFooter";
import {Box} from "@mui/material";
import StepRight from "./Steps/Right/StepRight";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";

const steps = ["Step1", "Step2", "Step3", "Step4", "Step5"];
const initial = {
    capital: 10000,
    currency: "USD",
    sharesNumber: 2000,
    startDate: new Date("2021-12-11T22:00:00.000Z"),
    sharesList: [
        {
            nameClass: "class1",
            shares: 333,
            votes: 444
        },
        {
            nameClass: "class2",
            shares: 1500,
            votes: 545
        },
        {
            nameClass: "class3",
            shares: 167,
            votes: 555}
    ],
    sharesBlocks: [
        {
            shares: 199,
            className: "Pref",
            shareholder: "Name Namesson",
            clauses: ["RFR", "TAR"]
        },
        {
            shares: 5,
            className: "Pref",
            shareholder: "Name Namesson2",
            clauses: ["RFR", "TAR"]
        },
        {
            shares: 15,
            className: "Pref",
            shareholder: "Name Namesson2",
            clauses: ["RFR", "TAR"]
        }]
};

const Shares = () => {
    const [shares, setShares] = useState(initial)
    const [step, setStep] = useState(1);
    const [continueBtnDisabled, setContinue] = useState(false);

    Yup.addMethod(Yup.object, 'uniqueProperty', function (propertyName, message) {
        return this.test('unique', message, function (value) {
            if (!value || !value[propertyName]) {
                return true;
            }

            if (
                this.parent
                    .filter(v => v !== value)
                    .some(v => v[propertyName] === value[propertyName])
            ) {
                throw this.createError({
                    path: `${this.path}.${propertyName}`,
                });
            }

            return true;
        });
    });

    const validation = {
        1: Yup.object({
            startDate: Yup.string()
                .required('Required'),
            capital: Yup.string()
                .required('Required'),
            sharesNumber: Yup.string()
                .required('Required'),
        }),
        2: Yup.object({
            sharesList: Yup.array().of(
                Yup.object().shape({
                    nameClass: Yup.string()
                        .required('Required'),
                    shares: Yup.string()
                        .required('Required'),
                    votes: Yup.string()
                        .required('Required'),
                }).uniqueProperty("nameClass", "Name is duplicated")
            ),
        }),
    }

    const formik = useFormik({
        initialValues: shares,
        validationSchema: validation[step],
        onSubmit: values => {
            if (step === 3) {
                console.log("SUBMIT", values);

            } else {
                setStep(step + 1);
                setShares({
                    ...values
                });
            }
        },
    });

    const backHandler = () => setStep(step - 1);
    const saveHandler = () => {
        console.log("SAVED");
        setShares({
            ...formik.values
        });
    }
    const continueHandler = () => {
            formik.handleSubmit();
    }

    const stepContent = (step) => {
        switch (step) {
            case 2: return <Step3 {...formik} setContinue={setContinue} />
            case 3: return <Step4 {...formik} />
            case 1:
            default: return <Step2 {...formik} />
        }
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} style={{height: "100%"}}>
                    <Box sx={{display: "flex", width: "100%", height: "calc(100% - 90px)"}}>
                        <Box sx={{width: "100%"}}>
                            <StepHeader step={step} steps={steps} setStep={setStep}/>
                            {stepContent(step)}
                        </Box>
                        { [2,3].includes(step) && <StepRight data={shares}/> }
                    </Box>
                    <StepFooter backHandler={backHandler} continueHandler={continueHandler} saveHandler={saveHandler} continueBtnDisabled={continueBtnDisabled || Object.keys(formik.errors).length} />
                </form>
            </FormikProvider>
        </Box>
    )
}

export default Shares;