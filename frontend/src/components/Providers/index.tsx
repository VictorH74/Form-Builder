import { AuthProvider } from "@/contexts/AuthContext";
import FormProvider from "@/contexts/FormContext";
import GraphQLClientProvider from "@/contexts/GraphQLContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

const Providers: React.FC<{ children: React.ReactElement }> = ({ children }) => (
    <GraphQLClientProvider>
        <AuthProvider>
            <LanguageProvider >
                <DndProvider backend={HTML5Backend}>
                    <FormProvider>
                        {children}
                    </FormProvider>
                </DndProvider>
            </LanguageProvider>
        </AuthProvider>
    </GraphQLClientProvider>
)

export default Providers