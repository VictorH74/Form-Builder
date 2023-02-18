import useLanguage from "@/hooks/UseLanguage"
import { useEffect, useState } from 'react';
import {marked} from 'marked';

function Readme() {
  const [readmeContent, setReadmeContent] = useState('');


  useEffect(() => {
    const fetchReadme = async () => {
      const response = await fetch(
        'https://api.github.com/repos/VictorH74/form-builder/readme'
      );
      const data = await response.json();
      const markdown = atob(data.content);
      setReadmeContent(marked(markdown));
    };

    fetchReadme();
  }, []);

  useEffect(() => {
    console.log(readmeContent)
  }, [readmeContent]);

  return (
    <div dangerouslySetInnerHTML={{ __html: readmeContent }} />
  );
}


function About() {
    const { language: lang } = useLanguage()

    return (
        <>
        {/* <h1>{lang === "en" ? "About" : "Sobre"}</h1> */}
        <Readme />
        </>
    )
}

export default About