import React, { useState } from 'react';
import { Formik } from "formik";


const [values, setValues] = useState({
    username: '',
    password: ''
});

const ValidatedLoginForm = () => (
    <Formik>
        initialValues={{username: "", password: ""}}
        onSubmit={handleSubmit}
    </Formik>
);

export default ValidatedLoginForm;
