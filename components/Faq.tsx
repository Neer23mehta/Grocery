'use client'
import React, { useEffect, useState } from 'react'
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi'
import { GoArrowRight } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from 'react-toastify';
import { Dialog, DialogContent, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Link from 'next/link';

interface Faq {
  Answer: string;
  Faq_id: number;
  Question: string;
}

const Faq = () => {
  const [faq, setFaq] = useState<Faq[]>([]);
  const [open, setOpen] = useState(false);

  const initialValues = {
    Question: "",
    Answer: ""
  }

  const validationSchema = Yup.object({
    Question: Yup.string().min(10, "Question should be at least 10 characters").max(999, "Question is too long").required("Question is Required"),
    Answer: Yup.string().min(10, "Answer should be at least 10 characters").required("Answer is Required")
  });

  const fetchFaq = async () => {
    try {
      const res = await commonGetApis("get_all_faqs")
      setFaq(res?.data?.result)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch FAQs")
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addFaqs(values);
    }
  });

  const addFaqs = async (values: { Question: string, Answer: string }) => {

    const formData = new URLSearchParams();
    formData.append("question", values.Question);
    formData.append("answer", values.Answer);
    try {
      const res = await commonPostApis("add_faqs", formData);
      if (res.data) {
        fetchFaq();
        setOpen(false);
        toast.success("FAQ Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenModal = () => {
    setOpen(!open);
  }

  const handleDeleteFaq = async (id: number) => {
    try {
      const res = await deleteApi(`delete_faqs?id=${id}`)
      if (res.data) {
        setFaq((prev) => prev.filter(item => item.Faq_id !== id))
        toast.success("Successfully Deleted");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong");
    }
  }

  useEffect(() => {
    fetchFaq();
    document.title="Admin faq"
  }, [])

  return (
    <div className='w-full'>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Faq</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Faqs</span> </p>
        </div>
        <div>
          <button onClick={handleOpenModal} className="px-2 py-2 bg-amber-300 ml-5 w-25 h-13 font-bold cursor-pointer">Add Faq</button>
        </div>
      </div>

      <div className='flex flex-col justify-center w-full px-4 py-3'>
        <ul>
          {faq.map((curVal, idx) => (
            <li className='flex flex-col justify-center bg-white shadow-md space-x-5 mt-3 py-3' key={idx}>
              <div className='flex flex-row justify-between items-center'>
                <p className='text-2xl'><span className='mr-5'>({idx + 1})</span>{curVal.Question}</p>
                <div className='flex flex-row justify-center items-center gap-2.5 cursor-pointer'>
                  <RiDeleteBin6Line size={25} onClick={() => handleDeleteFaq(curVal.Faq_id)} />
                </div>
              </div>
              <div className='flex flex-row justify-start items-center mt-5'>
                <GoArrowRight size={30} /> <p className='text-2xl ml-3'>{curVal.Answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className='bg-white shadow-md flex flex-col justify-center items-center'>
          <div className='flex justify-end'>
            <button className='ml-120 mt-2 text-2xl hover:text-red-700' onClick={() => setOpen(false)}>X</button>
          </div>
          <h1 className='px-2 text-2xl font-bold'>Add Faq</h1>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Question"
                variant="outlined"
                margin="normal"
                name="Question"
                value={formik.values.Question}
                onChange={formik.handleChange}
                error={formik.touched.Question && Boolean(formik.errors.Question)}
                helperText={formik.touched.Question && formik.errors.Question}
              />
              <TextField
                fullWidth
                label="Answer"
                variant="outlined"
                margin="normal"
                name="Answer"
                value={formik.values.Answer}
                onChange={formik.handleChange}
                error={formik.touched.Answer && Boolean(formik.errors.Answer)}
                helperText={formik.touched.Answer && formik.errors.Answer}
              />
              <div className='flex justify-center items-center mt-3 text-xl'>
                <button className='px-5 py-2 bg-amber-400' type="submit">Add Faq</button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}

export default Faq
