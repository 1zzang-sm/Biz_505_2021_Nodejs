module.exports = (sequelize, DataTypes)=>{

	// tbl_product가 table의 이름(변수, 객체)
	// tbl_product.findAll()... 처럼 사용한다
	// tbl_products.findAll() 처럼 사용금지
	const product = sequelize.define("tbl_product", 
	{
		p_code : {
			type : DataTypes.STRING(5),
			primaryKey : true,
		},
		p_name : {
			type : DataTypes.STRING,
			allowNull : false, // not null
		},
		p_price : {
			type : DataTypes.INTEGER,
			allowNull : false,
		},
		p_rem : {
			type : DataTypes.STRING
		}
	},
	{timestamps:false}
	)
	// tbl_table_orders와 tbl_product를 조인 할 수있도록 설정
	// 상품1 : 주문서 : N
	// tbl_table_orders의 to_pcode 칼럼과 현재 tbl_product
	product.associate = (models) =>{
		product.hasMany(models.tbl_table_orders, {
			foreignKey: "to_pcode"
		})
	}
	return product
}