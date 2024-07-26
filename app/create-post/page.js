"use client";

import { useState } from "react";
import Image from "next/image";

// import { getRandomPrompt } from "@/utils";

import { preview } from "@/public/assets";
import { FormField, Loader } from "@/components";

const create = () => {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const { name, prompt, photo } = form;

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSurpriseMe = async () => {
    // const randomPrompt = await getRandomPrompt(prompt);
    // setForm({ ...form, prompt: randomPrompt });

    try {
      const response = await fetch("http://localhost:8080/random-prompt");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { prompt } = await response.json();
      setForm({ ...form, prompt: prompt });
    } catch (error) {
      console.error("Failed to fetch prompt", error);
    }
  };

  const generateImage = async () => {
    if (prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        });

        const data = await response.json();
        console.log({ img: data });
        setForm({ ...form, photo: data.photo });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide a prompt");
    }
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='Teri'
            value={name}
            handleChange={handleChange}
          />

          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='An Impressionist oil painting of sunflowers in a purple vase…'
            value={prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {photo ? (
              <Image
                src={photo}
                alt={prompt}
                className='object-contain'
                layout='fill'
              />
            ) : (
              <Image
                width={192}
                height={192}
                src={preview}
                alt='preview'
                className='object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className=' text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default create;