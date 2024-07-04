import React, { useState, useRef, useEffect } from "react";
import Nav from './Nav'
import { LiaCertificateSolid } from "react-icons/lia";
import { FaCircleXmark } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from "axios";
import { BASE_URL } from "../services/helper";

const Goal = () => {

    const [goal, setGoal] = useState('');
    const [cards, setCards] = useState([]);

    async function addGoal(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/goal/add`, { goal: goal }, { withCredentials: true });

            if (res.data.msg === 'success') {
                console.log('success', res.data.goal);
                setCards(prevCards => [...prevCards, res.data.goal]);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function markComplet(id) {
        try {
            const res = await axios.post(`${BASE_URL}/goal/complete`, { goalId: id }, { withCredentials: true });

            if (res.data.msg === 'success') {

                const taskIndex = cards.findIndex(task => task._id === id);

                if (taskIndex !== -1) {

                    const completedTask = { ...cards[taskIndex] };
                    completedTask.completed = true;

                    const updatedTasks = [...cards];
                    updatedTasks[taskIndex] = completedTask;

                    setCards(updatedTasks);
                }
                toast.success(`Congratulations! You've completed the task`, { position: 'top-center', autoClose: 3000, });

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function deleteGoal(id) {
        try {
            const res = await axios.post(`${BASE_URL}/goal/delete`, { goalId: id }, { withCredentials: true });

            if (res.data.msg === 'success') {

                const newCards = cards.filter((card) => { return id !== card._id });
                setCards(newCards);

                toast.error('you deleted a task', { position: 'top-center', autoClose: 3000, });

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function getGoals() {
            try {
                const res = await axios.get(`${BASE_URL}/goal`, { withCredentials: true });

                if (res.data.msg === 'success') {
                    setCards(res.data.goals);
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        getGoals();
    }, []);


    // useEffect(() => {
    //     console.log(cards);
    // }, [cards]);

    function onChange(e) {
        setGoal(e.target.value);
    }
    return (
        <div>
            <Nav />

            <div className="mt-24">
                <div>
                <ToastContainer />
                <p className="text-xl font-bold text-center text-lime-700">Small Steps, Big Impact: Reduce Today, Protect Tomorrow.</p>
                </div>
            </div>

            <form onSubmit={addGoal}>
                <div className="flex justify-center mt-10 p-2">
                    <input type="text" placeholder="Enter your goal" onChange={onChange} name="goal" value={goal} required autoFocus className="border-2 w-80 rounded-md p-1 text-md focus:outline-none focus:border-lime-500" />
                    <button type="submit" className="bg-lime-300 w-20 text-lime-800 text-xl font-semibold  rounded-md mx-2 hover:border-2 hover:border-lime-600" >Add</button>
                </div>
            </form>

            <div className="mt-1 flex justify-center">
                <a href="/suggestion" className="text-lime-600 font-semibold mr-32 sm:mr-40">See Our Suggestion To Set Goals</a>
            </div>

            <div className="mt-12">
                <div>
                    <p className="text-4xl mb-8 font-bold text-center text-lime-600">Your Carbon Reduction Goals</p>

                    <div className="grid lg:grid-cols-3 xmd:grid-cols-2 gap-4 content-start pt-4 justify-center align-middle ">
                        {/* <div> */}
                            {
                                cards.map((card, i) => (
                                    !card.completed &&
                                    <div className="flex w-70 mb-4 mx-4 justify-center" key={i}>
                                        <div className="w-70 min-h-20 border-2 border-lime-500 rounded-lg">
                                            <div className="flex w-full h-full">
                                                <p className="mx-2 fit w-140 h-full content-center">{card.task}</p>

                                                <div className="w-full h-full flex mr-1 p-2">
                                                    <div className="content-start">
                                                        <OverlayTrigger overlay={<Tooltip id={`tooltip-1`}>Mark As Completed</Tooltip>}> 
                                                                <button onClick={(e) => markComplet(card._id)}><FaCircleCheck className="text-2xl font-bold mr-1 hover:text-cyan-500" /></button>
                                                        </OverlayTrigger>
                                                    </div>
                                                    <div className="content-start">
                                                        <OverlayTrigger overlay={<Tooltip id={`tooltip-2`}>Delete</Tooltip>}>
                                                            <button onClick={(e) => deleteGoal(card._id)}>
                                                                <FaCircleXmark className="text-2xl font-bold hover:text-red-600" />
                                                            </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            {
                                cards.map((card, i) => (
                                    card.completed &&
                                    <div className="flex mb-4 justify-center" key={i}>
                                        <div className="w-80 min-h-20  content-center bg-gradient-to-r from-green-800 via-lime-500 to-lime-400  rounded-lg">
                                            <div className="flex w-full h-full">
                                                <p className="mx-2 w-140 h-full text-white content-center">{card.task}</p>
                                                <div className="w-full h-full flex mr-1 p-2 ">
                                                    <div className="content-start mx-2 ">
                                                        <div className="flex">
                                                        <LiaCertificateSolid className="text-3xl font-bold " />
                                                        <p>completed</p>
                                                        </div>
                                                    </div>
                                                    <div className="content-start ">
                                                        <OverlayTrigger overlay={<Tooltip id={`tooltip-3`}>Delete</Tooltip>}> 
                                                        <button onClick={(e) => deleteGoal(card._id)}>
                                                                <FaCircleXmark className="text-2xl font-bold hover:text-red-600" />
                                                        </button>
                                                        </OverlayTrigger>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        {/* </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Goal;