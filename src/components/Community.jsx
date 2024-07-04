import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify"

import { UserContext } from '../UserContext';

import { Plus } from 'lucide-react';
import { X } from 'lucide-react';
import { Trash2 } from 'lucide-react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import axios from "axios";
import { BASE_URL } from "../services/helper";


const Community = () => {

    const {role} = useContext(UserContext);

    const dialogRef = useRef(null);
    const dialogRefThought = useRef(null);
    const dialogRefEventDetails = useRef(null);
    const dialogRefPostDetails = useRef(null);

    const [selectedCard, setSelectedCard] = useState({});
    const [selectedPost, setSelectedPost] = useState({});

    const [visitor,setVisitor] = useState('');

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    const openDialogThought = () => {
        if (dialogRefThought.current) {
            dialogRefThought.current.showModal();
        }
    };

    const closeDialogThought = () => {
        if (dialogRefThought.current) {
            dialogRefThought.current.close();
        }
    }

    const openDialogEventDetails = (card) => {
        if (dialogRefEventDetails.current) {
            setSelectedCard(card);
            dialogRefEventDetails.current.showModal();
        }
    };

    const closeDialogEventDetails = () => {
        if (dialogRefEventDetails.current) {
            dialogRefEventDetails.current.close();
        }
    }

    const openDialogPostDetails = (card,email) => {
        if (dialogRefPostDetails.current) {
            setSelectedPost({...card, email});
            dialogRefPostDetails.current.showModal();
        }
    };

    const closeDialogPostDetails = () => {
        if (dialogRefPostDetails.current) {
            dialogRefPostDetails.current.close();
        }
    }

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
    });

    const [eventCards, setEventCards] = useState([]);
    const [postCards, setPostCards] = useState([]);
    const [postBy,setPostBy]= useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateObj = new Date(formData.date);

        const ddmmyyyy = dateObj.toLocaleDateString('en-GB');
        formData.date = ddmmyyyy;

        const day = days[dateObj.getDay()];
        try {
            const res = await axios.post(`${BASE_URL}/community/addEvent`, { ...formData, day }, { withCredentials: true });

            if (res.data.msg === 'success') {

                setEventCards([res.data.card, ...eventCards]);
                toast.success('Event Added Successfully', { position: 'top-center', autoClose: 3000, });
                setFormData({ title: '', date: '', description: '' });
                closeDialog();
            }
            else {
                console.log('fail');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        async function getEvents() {
            try {
                const res = await axios.get(`${BASE_URL}/community/events`, { withCredentials: true });

                if (res.data.msg === 'success') {
                    setEventCards(res.data.cards);
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        getEvents();

        async function getPosts() {
            try {
                const res = await axios.get(`${BASE_URL}/community/posts`, { withCredentials: true });

                if (res.data.msg === 'success') {
                    setPostCards(res.data.cards);
                    setPostBy(res.data.by);
                    setVisitor(res.data.visitor);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        getPosts();
    }, []);


    async function deleteEvent(id) {
        try {
            const res = await axios.delete(`${BASE_URL}/community/deleteEvent/${id}`, { withCredentials: true });

            if (res.data.msg === 'success') {

                const newCards = eventCards.filter((event) => { return event._id !== id });
                toast.error('Event Deleted Successfully', { position: 'top-center', autoClose: 3000, });
                setEventCards(newCards);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function deletePost(id){
        try {
            const res = await axios.delete(`${BASE_URL}/community/deletePost/${id}`, { withCredentials: true });

            if (res.data.msg === 'success') {
                const index = postCards.findIndex(post => post._id === id);

                const newPosts = postCards.filter((post) => { return post._id !== id });

                postBy.splice(index,1);

                toast.error('Post Deleted Successfully', { position: 'top-center', autoClose: 3000, });
                setPostCards(newPosts);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [postForm,setPostForm]=useState({
        title:'',
        description:'',
    });

    function handleChangePost(e){
        setPostForm({...postForm,[e.target.name]:e.target.value});
    }

    async function addPost(e){
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/community/addPost`, { postForm }, { withCredentials: true });

            if (res.data.msg === 'success') {
                setPostCards([res.data.card, ...postCards]);
                toast.success('Post Added Successfully', { position: 'top-center', autoClose: 3000, });
                
                setPostBy([{email:res.data.by},...postBy]);

                setPostForm({ title: '',description: '' });
                closeDialogThought();
            }
            else {
                console.log(res.data);               
                console.log('fail');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    console.log(role);
    return (
        <div>
            <Nav />

            <dialog ref={dialogRefEventDetails} className="w-96 min-h-48 rounded-lg">
                <div className="flex w-full justify-end">
                    <button onClick={closeDialogEventDetails} className="clsBtn p-1 text-4xl hover:text-gray-700 "><X size={30} strokeWidth={3} /></button>
                </div>

                <div className="w-full flex text-lime-600 justify-center">
                    <div>
                        <h2 className="text-2xl font-bold">{selectedCard.title}</h2>
                    </div>
                </div>

                <div className="w-full flex justify-start mt-4 px-4">
                    <div>
                        <h2 className="text-md flex text-gray-500 font-semibold"><FaCalendarAlt className="text-lg mr-1" />{selectedCard.date} ({selectedCard.day})</h2>
                    </div>
                </div>

                <div className="w-full flex justify-start">
                    <div>
                        <h2 className="p-4">{selectedCard.description}</h2>
                    </div>
                </div>

            </dialog>

            <dialog ref={dialogRef} className="w-96 min-h-48 rounded-lg">

                <div className="flex w-full justify-end">
                    <button autoFocus onClick={closeDialog} className="clsBtn p-1 text-4xl hover:text-gray-700"><X size={30} strokeWidth={3} /></button>
                </div>

                <div className="w-full flex text-lime-600 justify-center">
                    <div>
                        <h2 className="text-2xl font-bold">Add Event</h2>
                    </div>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-4 px-4">
                        <label htmlFor="title" className="block text-lg font-bold mb-1">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder='Enter Event Title'
                            className=" w-full border-2 p-1 rounded-md focus:outline-none focus:border-lime-500"
                        />
                    </div>

                    <div className="mb-4 px-4">
                        <label htmlFor="date" className="block text-lg font-bold mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className=" w-full border-2 p-1 rounded-md focus:outline-none focus:border-lime-500"
                        />
                    </div>

                    <div className="mb-4 px-4">
                        <label htmlFor="description" className="block text-lg font-bold mb-1">Event Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            placeholder="Enter Event Description"
                            className=" w-full border-2 p-1 rounded-md focus:outline-none focus:border-lime-500"
                        />
                    </div>

                    <div className="mb-6 px-4">
                        <button
                            type="submit"
                            className="bg-lime-600 text-white font-bold py-2 px-4 rounded-md hover:bg-lime-500 focus:outline-none"
                        >
                            Add Event
                        </button>
                    </div>
                </form>

            </dialog>

            <dialog ref={dialogRefThought} className="w-96 min-h-48 rounded-lg">
                <div className="flex w-full justify-end">
                    <button onClick={closeDialogThought} className="clsBtn p-1 text-4xl hover:text-gray-700 "><X size={30} strokeWidth={3} /></button>
                </div>

                <div className="w-full flex text-lime-600 justify-center">
                    <div>
                        <h2 className="text-2xl font-bold">Post</h2>
                    </div>
                </div>


                <form onSubmit={addPost}>
                    <div className="mb-4 mt-4 px-4">
                        <label htmlFor="title" className="block text-lg font-bold mb-1">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={postForm.title}
                            onChange={handleChangePost}
                            required
                            placeholder='Enter Event Title'
                            className=" w-full border-2 p-1 rounded-md focus:outline-none focus:border-lime-500"
                        />
                    </div>

                    <div className="mb-4 px-4">
                        <label htmlFor="description" className="block text-lg font-bold mb-1">Description:</label>
                        <textarea
                            name="description"
                            value={postForm.description}
                            onChange={handleChangePost}
                            rows={4}
                            required
                            placeholder="Enter Event Description"
                            className=" w-full border-2 p-1 rounded-md focus:outline-none focus:border-lime-500"
                        />
                    </div>

                    <div className="mb-6 px-4">
                        <button
                            type="submit"
                            className="bg-lime-600 text-white font-bold py-2 px-4 rounded-md hover:bg-lime-500 focus:outline-none"
                        >
                            Add Post
                        </button>
                    </div>
                </form>
            </dialog>

            <dialog ref={dialogRefPostDetails} className="w-96 min-h-48 rounded-lg">
                <div className="flex w-full justify-end">
                    <button onClick={closeDialogPostDetails} className="clsBtn p-1 text-4xl hover:text-gray-700 "><X size={30} strokeWidth={3} /></button>
                </div>

                <div className="w-full flex text-lime-600 justify-center">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
                    </div>
                </div>

                <div className="w-full flex justify-start mt-4 px-4">
                    <div>
                        <h2 className="text-md flex text-gray-500 font-semibold">By: {selectedPost.email}</h2>
                    </div>
                </div>

                <div className="w-full flex justify-start">
                    <div>
                        <h2 className="p-4 ">{selectedPost.description}</h2>
                    </div>
                </div>
            </dialog>

            <div className="mt-20">
                <ToastContainer />
                <h1 className="bg-gradient-to-r p-1 from-green-700 via-lime-600 to-lime-400 text-transparent bg-clip-text md:text-4xl text-2xl text-center font-extrabold">EcoEcho: ' Amplifying Voices for Carbon Reduction '</h1>

                <div className="flex justify-center">
                    <div className="border-2 xsm:mx-2 sm:mx-12 p-4 rounded-lg mt-10 border-lime-500 w-full ">

                        <div className="flex w-full">
                            <p className="text-xl font-bold">Upcoming Events:</p>
                            { role==='admin' && <button onClick={openDialog} className="border-2 -mt-2 border-lime-400 hover:border-lime-600 rounded-lg pr-2 py-1 flex  mx-4"><Plus strokeWidth={2.5} /><p className="content-center font-bold">Add Event</p></button>}
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="grid lg:grid-cols-3 xmd:grid-cols-2 gap-x-24 pt-4">
                                {eventCards &&
                                    eventCards.map((card, i) => (
                                        <div className="mt-6 mb-2" key={i}>
                                            <div className="min-w-64 shadow-md border-2 rounded-lg min-h-24 ">
                                                <div className="p-2">
                                                    <p className="text-xl font-bold">{card.title}</p>
                                                    <p className="flex mt-2 text-gray-500 font-semibold"><FaCalendarAlt className="text-xl mr-1" />{card.date} - {card.day}</p>
                                                    <div className="h-full">
                                                        <button onClick={() => openDialogEventDetails(card)} className="bg-gradient-to-r from-green-700 to-lime-500 p-2 mt-4 font-bold text-white rounded-lg hover:from-lime-500 hover:to-green-700">View Details</button>
                                                       {role==='admin' && <OverlayTrigger overlay={
                                                            <Tooltip id={`tooltip-1`}>
                                                                Delete Event
                                                            </Tooltip>
                                                        }>
                                                            <button onClick={() => deleteEvent(card._id)} className=" mx-2 p-1 mt-6 font-bold " ><Trash2 className="text-red-500" size={24} strokeWidth={2.25} /></button>
                                                        </OverlayTrigger>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="border-2 xsm:mx-2 sm:mx-12 p-4 mb-10 rounded-lg mt-10 border-lime-500 w-full ">

                        <div className="flex w-full">
                            <p className="text-xl font-bold">User's Contribution For Sustainable Awareness:</p>
                           { role ? <button onClick={openDialogThought} className="border-2 -mt-1 border-lime-400 hover:border-lime-600 rounded-lg pr-2 py-1 flex  mx-4"><Plus strokeWidth={2.5} /><p className="content-center font-bold">Add Post</p></button> 
                           : <a href="/login"><button className="border-2 -mt-1 border-lime-400 hover:border-lime-600 rounded-lg pr-2 py-1 flex  mx-4"><Plus strokeWidth={2.5} /><p className="content-center font-bold">Add Post</p></button></a>}
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="grid lg:grid-cols-3 xmd:grid-cols-2 gap-x-24 pt-4">
                                {
                                postCards &&
                                    postCards.map((card, i) => (
                                        <div className="mt-6 mb-2" key={i}>
                                            <div className="min-w-64 shadow-md border-2 rounded-lg min-h-24 ">
                                                <div className="p-2">
                                                    <p className="text-xl font-bold text-lime-600">{card.title}</p>
                                                    <p className="flex mt-2 text-gray-500 font-semibold">By: {postBy[i].email}</p>
                                                    <div className="h-full">
                                                        <button onClick={() => openDialogPostDetails(card,postBy[i].email)} className="bg-gradient-to-r from-green-700 to-lime-500 p-2 mt-4 font-bold text-white rounded-lg hover:from-lime-500 hover:to-green-700">View Details</button>
                                                        { (postBy[i].email === visitor || role==='admin') && <OverlayTrigger overlay={
                                                            <Tooltip id={`tooltip-1`}>
                                                                Delete Post
                                                            </Tooltip>
                                                        }>
                                                            <button onClick={() => deletePost(card._id)} className=" mx-2 p-1 mt-6 font-bold " ><Trash2 className="text-red-500" size={24} strokeWidth={2.25} /></button>
                                                        </OverlayTrigger>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community;