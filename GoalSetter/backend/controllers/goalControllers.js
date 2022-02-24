const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc Get goals
// @route GET /api/goals
// @accrss Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({})
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
    text
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

  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }
