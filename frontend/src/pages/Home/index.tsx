import { Container, Content } from "./styles"
import exampleForms from "@/assets/example-forms.png"
import { useNavigate } from 'react-router-dom';
import useTranslate from "@/hooks/UseTranslate";

const Home = () => {
    const navigate = useNavigate()
    const translate = useTranslate({
        en: {
            welcome: "Welcome to Form Builder",
            text1: "Build forms quickly and easily!",
            text2: "Download your form in PDF",
            getStarted: "Get Started"
        },
        "pt-BR": {
            welcome: "Seja bem-vindo ao Form Builder",
            text1: "Crie seus formulários de forma rápida e fácil!",
            text2: "Baixe seu formulário em PDF",
            getStarted: "Começar Agora"
        }
    })

    return (
        <Container>
            <Content>
                <h1>{translate("welcome")}</h1>
                <section className="first">
                    <div className="inner">
                        <ul>
                            <li>
                                <p> {translate("text1")} </p>
                            </li>
                            <li>
                                <p> {translate("text2")} </p>
                            </li>
                            <button onClick={() => navigate("my-forms/add/")}>{translate("getStarted")}</button>
                        </ul>
                        <img src={exampleForms} />
                    </div>
                </section>
            </Content>
        </Container>
    )
}


export default Home


