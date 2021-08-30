module.exports = (sequelize, DataTypes) =>{

	const product = sequelize.define("tbl_product" ,{
		p_code : {
			type : DataTypes.INTEGER,
			primaryKey : true,
		},
		p_name : {
			type : DataTypes.STRING(30),
			allowNull : false,
		},
		p_price : {
			type : DataTypes.INTEGER,
			allowNull : false,
		},
		p_rem : {
			type : DataTypes.STRING(30),
		},
	})
	product.associate = (models) => {
		product.hasMany(models.tbl_orders, {foreignKey : "o_pcode"})
	}
	return product;
}