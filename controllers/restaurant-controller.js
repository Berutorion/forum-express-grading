
const { Restaurant, Category } = require('../models')

const restaurantController = {

  getRestaurants: async (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''
    console.log('categoryId', categoryId)
    try {
      const [restaurants, categories] = await Promise.all([
        Restaurant.findAll({ raw: true, nest: true, include: [Category], where: { ...categoryId ? { categoryId } : {} } }),
        Category.findAll({ raw: true })
      ])
      const data = restaurants.map(r => {
        return {
          ...r, description: r.description.substring(0, 50)
        }
      })
      return res.render('restaurants', { restaurants: data, categories, categoryId })
    } catch (error) {
      next(error)
    }
  },
  getRestaurant: async (req, res, next) => {
    try {
      const { id } = req.params
      const restaurant = await Restaurant.findByPk(id, { nest: true, include: Category })
      await restaurant.increment('viewCounts')// 計算瀏覽次數
      if (!restaurant) throw new Error('找不到指定餐廳')
      res.render('restaurant', { restaurant: restaurant.toJSON() })
    } catch (error) {
      next(error)
    }
  },
  getDashboard: async (req, res, next) => {
    const { id } = req.params
    try {
      const restaurant = await Restaurant.findByPk(id, { nest: true, include: Category })
      res.render('dashboard', { restaurant: restaurant.toJSON() })
    } catch (error) {

    }
  }
}

module.exports = restaurantController
