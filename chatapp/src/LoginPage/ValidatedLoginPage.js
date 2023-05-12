import React, { useState } from 'react';
import { Formik, formik } from "formik";
import * as Yup from Yup;

const [values, setValues] = useState({
    username: '',
    password: ''
})

const ValidatedLoginForm = () => (
    <Formik>
        initialValues={{username: "", password: ""}}
        onSubmit={handleSubmit}
    </Formik>
);

export default ValidatedLoginForm;
