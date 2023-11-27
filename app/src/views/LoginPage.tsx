import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { PageLayout } from "../components/PageLayout";
import { GetUserDto, UserController } from "../controller/api/UserController";
import { getCurrentUser, setCurrentUser } from "../controller/session/session";

async function onSubmit(values: any, navigate: NavigateFunction) {
    var data: any = await UserController.getUserByEmail(values.email)
    if (values.password == undefined || values.email == undefined) {
        alert("Please fill in every field")
        return
    }
    if (data.error != undefined) {
        alert(data.message)
        return
    }
    if (data.password == values.password) {
        setCurrentUser(data)
        navigate("/orders")
        return
    }
    alert("Bad password!")
}

export function LoginPage() {
    var navigate = useNavigate()
    return (
        <PageLayout title={"Egy átlagos autószerelő-műhely átlagos weboldala"}>
            <InputForm title="Bejelentkezés" submitButtonText="Belépés" onSubmit={(value) => onSubmit(value, navigate)} inputFormElements={
                [
                    {
                        title: "E-mail cím",
                        id: "email",
                        inputType: "text"
                    },
                    {
                        title: "Jelszó",
                        id: "password",
                        inputType: "password"
                    }
                ]
            }>
                <a>Nincs még fiókod? Legyél átlagos! <Link to={"/register"}>Regisztrálj!</Link></a>
            </InputForm>
        </PageLayout>
    )
}