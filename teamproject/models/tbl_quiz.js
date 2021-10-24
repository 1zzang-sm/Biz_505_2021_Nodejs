module.exports = (sequelize, DataTypes)=>{
	const quiz = sequelize.define("tbl_quiz", 
	{
		problem : {
			type : DataTypes.STRING(125),
		},
		btn_o : {
			type : DataTypes.INTEGER,
			allowNull : false,
		},
		btn_x : {
			type : DataTypes.INTEGER,
			allowNull : false,
		},
	})
	return quiz
}