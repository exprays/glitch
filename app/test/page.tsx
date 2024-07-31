"use client";

import { EventForm } from "@/components/forms/createEvent";
import ResponsiveFormContainer from "@/components/responsiveFormContainer";
import Ripple from "@/components/ripple";

const TestPage = () => {
    return ( 
        <>
        <h1 className="px-4 py-4 ml-4 text-6xl text-pink-500 font-semibold">Create a event</h1>
           <ResponsiveFormContainer>
                <EventForm />
           </ResponsiveFormContainer>
        <Ripple />
        </>
     );
}
 
export default TestPage;