'use client';
import React, { useEffect, useState } from 'react';
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, TextField, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Faq {
  Answer: string;
  Faq_id: number;
  Question: string;
}

const Faq = () => {
  const [faq, setFaq] = useState<Faq[]>([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    if (!token) {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    fetchFaq();
    document.title = 'Admin FAQ';
  }, []);

  const fetchFaq = async () => {
    try {
      const res = await commonGetApis('get_all_faqs');
      setFaq(res?.data?.result || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch FAQs');
    }
  };

  const initialValues = { Question: '', Answer: '' };

  const validationSchema = Yup.object({
    Question: Yup.string().min(10).required('Question is required'),
    Answer: Yup.string().min(10).required('Answer is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new URLSearchParams();
      formData.append('question', values.Question);
      formData.append('answer', values.Answer);

      try {
        const res = await commonPostApis('add_faqs', formData);
        const newId = res.data?.id || Date.now(); 
        setNewlyAddedId(newId);
        fetchFaq();
        setOpen(false);
        toast.success('FAQ Added Successfully');

        setTimeout(() => setNewlyAddedId(null), 4000);
      } catch (err) {
        console.error(err);
        toast.error('Failed to add FAQ');
      }
    },
  });

  const handleDelete = async (id: number) => {
    try {
      await deleteApi(`delete_faqs?id=${id}`);
      setFaq((prev) => prev.filter((f) => f.Faq_id !== id));
      toast.success('Deleted successfully');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className='w-full p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold'>FAQ Management</h1>
        <button onClick={() => setOpen(true)} className='bg-amber-400 px-4 py-2 font-semibold rounded shadow'>
          Add FAQ
        </button>
      </div>

      <div className='space-y-3'>
        <AnimatePresence>
          {faq.map((item, idx) => (
            <motion.div
              key={item.Faq_id}
              initial={item.Faq_id === newlyAddedId ? { scale: 0.9, opacity: 0, backgroundColor: '#d1fae5' } : { opacity: 0 }}
              animate={{ scale: 1, opacity: 1, backgroundColor: '#ffffff' }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 5.0 }}
              className='shadow-md rounded p-4 border cursor-pointer relative'
              onClick={() => setExpanded(expanded === item.Faq_id ? null : item.Faq_id)}
            >
              <div className='flex justify-between items-center'>
                <p className='text-xl font-medium'>
                  {idx + 1}. {item.Question}
                </p>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.Faq_id);
                  }}
                  size="small"
                  color="error"
                >
                  <RiDeleteBin6Line />
                </IconButton>
              </div>

              <AnimatePresence>
                {expanded === item.Faq_id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-2 text-gray-700'
                  >
                    👉  {item.Answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className='bg-white p-5 rounded w-full'>
          <h2 className='text-2xl font-bold mb-4 flex justify-center'>Add FAQ</h2>
          <DialogContent>
            <form onSubmit={formik.handleSubmit} className='space-y-4'>
              <TextField
                fullWidth
                label="Question"
                name="Question"
                value={formik.values.Question}
                onChange={formik.handleChange}
                error={formik.touched.Question && Boolean(formik.errors.Question)}
                helperText={formik.touched.Question && formik.errors.Question}
              />
              <div className='mt-5'>
              <TextField
                fullWidth
                label="Answer"
                name="Answer"
                multiline
                value={formik.values.Answer}
                onChange={formik.handleChange}
                error={formik.touched.Answer && Boolean(formik.errors.Answer)}
                helperText={formik.touched.Answer && formik.errors.Answer}
              />
              </div>
              <div className='flex justify-center pt-2'>
                <button type="submit" className='bg-amber-300 text-black font-bold px-4 py-2 rounded'>
                  Submit
                </button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Faq;
