import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// for dashboard
export const getDashboard = async (req, res) => {
  try {
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    // find recent Transaction
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // overallStat
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStats[0];

    // current month
    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    // current day
    const thisDayState = overallStats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisDayState,
      thisMonthStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
