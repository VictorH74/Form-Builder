import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Container } from "./styles";
import Loading from "@/components/Loading";

const repositoryReadmeUrl = 'https://api.github.com/repos/VictorH74/form-builder/readme'

function Readme() {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    const fetchReadme = async () => {
      const response = await fetch(repositoryReadmeUrl);
      const data = await response.json();
      const markdown = atob(data.content);
      setReadmeContent(marked(markdown));
    };

    fetchReadme();
  }, []);

  useEffect(() => {
    console.log(readmeContent)
  }, [readmeContent]);

  if (!readmeContent) return <Loading />

  return (
    <>
      <Container dangerouslySetInnerHTML={{ __html: readmeContent }} />
      <div>
        <a href="https://github.com/VictorH74/form-builder">GitHub Repository</a>
      </div>
    </>
  )
}


const About = () => (<Readme />)

export default About