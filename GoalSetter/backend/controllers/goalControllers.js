const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @accrss Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc Set goals
// @route POST /api/goals
// @accrss Private
const setGoal = asyncHandler(async (req, res) => {
  const { text } = req.body

  if (!text) {
    res.status(400)
    throw new Error('Please add text field')
  }

  const newGoal = await Goal.create({
    text,
    user: req.user.id
  })
  res.status(201).json(newGoal)
})

// @desc update goals
// @route UPDATE /api/goals/:id
// @accrss Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(400)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedGoal)
})

// @desc delete goals
// @route DELETE /api/goals/:id
// @accrss Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(400)
    throw new Error('User not authorized')
  }

  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
