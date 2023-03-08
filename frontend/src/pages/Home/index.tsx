import ExampleForms from "./components/ExampleForms"
import { Container, Content } from "./styles"
import exampleForms from "@/assets/example-forms.png"

const Home = () => {
    return (
        <Container>
            <Content>
                <h1>Welcome to Form Builder</h1>
                <section className="first">
                    <div className="inner">
                        <ul>
                            <li>
                                <p> Build forms quickly and easily </p>
                            </li>
                            <li>
                                <p> Download your form in PDF </p>
                            </li>
                            <button>Get Started</button>
                        </ul>
                        <img src={exampleForms} />
                    </div>
                </section>
            </Content>
        </Container>
    )
}


export default Home


