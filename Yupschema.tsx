import React from 'react'
import * as Yup from 'yup';

export const HandleYupSchema = Yup.object({
    managedelivery: Yup.string().min(5,"Delivery Must Be Managed"),
    managetax:Yup.string().min(10, "Must have Some Tax")
})