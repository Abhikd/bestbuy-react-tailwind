import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll';

const Products = () => {

    const [productList, setProductList] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [cartArray, setCartArray] = useState([]);
    const [total, setTotal] = useState(0);
    const [show, setShow] = useState(true);


    const categoryFilter = (category) => {
        setProductFilter(productList);

        setProductFilter(
            productList.filter((product) => {
                return product.category === category;
            })
        )
    }

    const priceFilter = (price) => {
        console.log(productFilter)
        setProductFilter(
            productFilter.filter((product) => {
                return product.price <= price;
            })
        )
    }

    const ratingFilter = (rating) => {
        setProductFilter(
            productFilter.filter((product) => {
                return product.rating >= rating;
            })
        )
    }

    const discountFilter = (discount) => {
        setProductFilter(
            productFilter.filter((product) => {
                return product.discountPercentage >= discount;
            })
        )
    }

    const sortAZPrice = (productFilter) => {
        const proAscending = [...productFilter].sort((a, b) => a.price - b.price);
        setProductFilter(proAscending);
    }

    const sortZAPrice = (productFilter) => {
        const proDescending = [...productFilter].sort((a, b) => b.price - a.price);
        setProductFilter(proDescending);
    }

    const sortAZRating = (productFilter) => {
        const proRatingAscending = [...productFilter].sort((a, b) => a.rating - b.rating);
        setProductFilter(proRatingAscending);
    }

    const sortZARating = (productFilter) => {
        const proRatingDescending = [...productFilter].sort((a, b) => b.rating - a.rating);
        setProductFilter(proRatingDescending);
    }

    const sortZADiscount = (productFilter) => {
        const proDiscountDescending = [...productFilter].sort((a, b) => b.discountPercentage - a.discountPercentage);
        setProductFilter(proDiscountDescending);
    }

    const sortAZDiscount = (productFilter) => {
        const proDiscountAscending = [...productFilter].sort((a, b) => a.discountPercentage - b.discountPercentage);
        setProductFilter(proDiscountAscending);
    }

    const handleCart = (product) => {
        if(cartArray.includes(product)) {
            alert("Item already added to cart!");
        }
       else if (product.stock >= 1 && product.stock <= 50) {
            alert("Only a few items left! Item added to your cart!")
            setCartArray([...cartArray, product]);
            setTotal(total + product.price);
            setShow(false);
        }
        else {
            alert("Item added to your cart!");
            setCartArray([...cartArray, product]);
            setTotal(total + product.price);
            setShow(false);
        }
    }

    const handleBuy = () => {
        if (total === 0) alert("Card empty! Add Items.")
        else {
            alert("Thanks for shopping with us!");
            setCartArray([]);
            setTotal(0);
            setProductFilter(productList);
            setShow(true);
        }
    }

     const deleteHandler = (id, price) => {
        setTotal(total - price);
        setCartArray(
            cartArray.filter((product) => {
                return product.id !== id;
            })
        )

    }



    useEffect(() => {
        const getData = async () => {
            await fetch('https://dummyjson.com/products?limit=48')
                .then(response => response.json())
                .then(responseData =>
                    setProductList(responseData.products)

                )
        }

        getData();
    }, [])

    useEffect(() => {
        const getFilterData = async () => {
            await fetch('https://dummyjson.com/products?limit=48')
                .then(response => response.json())
                .then(responseData =>
                    setProductFilter(responseData.products)

                )
        }

        getFilterData();
    }, [])


    return (
        <div className='max-w-[1640px] m-auto px-4 py-12 '>
            <h1 id='products' className='text-orange-600 font-bold text-4xl text-center '>Top Rated Items</h1>

            <div className='flex flex-col'>
                <div>
                    <p className='font-bold text-gray-700'>Category</p>
                    <div className='flex flex-wrap' >
                        <button onClick={() => setProductFilter(productList)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600 '>All</button>
                        <button onClick={() => categoryFilter('smartphones')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>smartphones</button>
                        <button onClick={() => categoryFilter('laptops')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>laptops</button>
                        <button onClick={() => categoryFilter('fragrances')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>fragrances</button>
                        <button onClick={() => categoryFilter('skincare')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>skincare</button>
                        <button onClick={() => categoryFilter('groceries')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>groceries</button>
                        <button onClick={() => categoryFilter('home-decoration')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>home-decoration</button>
                        <button onClick={() => categoryFilter('tops')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>tops</button>
                        <button onClick={() => categoryFilter('womens-dresses')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>womens-dresses</button>
                        <button onClick={() => categoryFilter('womens-shoes')} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>womens-shoes</button>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-gray-700 '>Price</p>
                    <div className='flex flex-wrap'>
                        <button onClick={() => priceFilter(2000)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:outline-none focus:ring focus:ring-orange-600'>Below 2000</button>
                        <button onClick={() => priceFilter(1500)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Below 1500</button>
                        <button onClick={() => priceFilter(1000)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Below 1000</button>
                        <button onClick={() => priceFilter(500)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Below 500</button>
                        <button onClick={() => priceFilter(200)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Below 200</button>
                        <button onClick={() => priceFilter(100)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Below 100</button>
                        <button onClick={() => priceFilter(25)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Below 25</button>
                        <button onClick={() => sortAZPrice(productFilter)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Low to High</button>
                        <button onClick={() => sortZAPrice(productFilter)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>High to Low</button>

                    </div>
                </div>

                <div>
                    <p className='font-bold text-gray-700'>Rating</p>
                    <div className='flex'>
                        <button onClick={() => ratingFilter(3)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 3</button>
                        <button onClick={() => ratingFilter(3.5)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 3.5</button>
                        <button onClick={() => ratingFilter(4)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 4</button>
                        <button onClick={() => ratingFilter(4.5)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 4.5</button>
                        <button onClick={() => sortAZRating(productFilter)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Low to High</button>
                        <button onClick={() => sortZARating(productFilter)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>High to Low</button>

                    </div>
                </div>
                <div>
                    <p className='font-bold text-gray-700'>Discount</p>
                    <div className='flex'>
                        <button onClick={() => discountFilter(5)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 5%</button>
                        <button onClick={() => discountFilter(10)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 10%</button>
                        <button onClick={() => discountFilter(15)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 15%</button>
                        <button onClick={() => discountFilter(20)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Above 20%</button>
                        <button onClick={() => sortAZDiscount(productFilter)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>Low to High</button>
                        <button onClick={() => sortZADiscount(productFilter)} className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring focus:ring-orange-600'>High to Low</button>

                    </div>
                </div>

            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>



                {productFilter.map((product) =>

                    <>
                        <div key={product.id} className=" border rounded-lg shadow-lg hover:scale-105 duration-300  ">
                            <img src={product.thumbnail} alt={product.name} className="w-full h-[200px] object-cover rounded-t-lg" />
                            <div className='flex justify-between px-2 py-4'>
                                <p className='font-bold'>
                                    {product.title}
                                </p>
                            </div>
                            <p className='font-semibold ml-2 mt-2'>Price:
                                <span className='bg-orange-500 text-white p-1 rounded-full m-1'>${product.price}</span>
                            </p>
                            <p className='font-semibold ml-2 mt-4 mb-2'>Rating:
                                <span className=''>{product.rating}</span>
                            </p>
                            <p className='font-semibold ml-2'>Brand:
                                <span className='m-1'>{product.brand}</span>
                            </p>
                            <div className='flex justify-end'><button onClick={() => handleCart(product)} className='m-2 bg-orange-600 text-white border-white'>Add to cart</button> </div>
                        </div>
                    </>

                )}
            </div>


            <div id='cart' className='mt-44'>
                <h1 className='text-orange-600 font-bold text-4xl text-center mb-10 '>Cart</h1>
                <div>{show ? <div className='flex justify-center'> <p className='font-bold text-black text-xl'>Cart is empty.</p> </div> : ""}</div>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                    {cartArray.map((product) =>
                        <>
                            <div key={product.id} className="border rounded-lg shadow-lg hover:scale-105 duration-300 ">
                                <img src={product.thumbnail} alt={product.name} className="w-full h-[200px] object-cover rounded-t-lg" />
                                <div className='flex justify-between px-2 py-4'>
                                    <p className='font-bold'>
                                        {product.title}
                                    </p>
                                </div>
                                <p className='font-semibold ml-2 mt-2'>Price:
                                    <span className='bg-orange-500 text-white p-1 rounded-full m-1'>${product.price}</span>
                                </p>
                                <p className='font-semibold ml-2 mt-4 mb-2'>Rating:
                                    <span className=''>{product.rating}</span>
                                </p>
                                <p className='font-semibold ml-2'>Brand:
                                    <span className='m-1'>{product.brand}</span>
                                </p>
                                <div className='flex justify-end'><button onClick={() => deleteHandler(product.id, product.price)} className='m-2 bg-orange-600 text-white border-white'>Delete</button> </div>

                            </div>
                        </>


                    )}
                </div>
                <div className='h-[5px] bg-orange-600 max-w-[1640px] mt-7 mb-7'></div>
                <div className='flex justify-end'>
                    <p className='font-bold text-gray-700 text-2xl'>Total:${total}</p>
                </div>
              {!show ?  <div className='flex justify-end'>
                    <Link to="home" spy={true} smooth={true} offset={-100} duration={2000}>
                        <button id='hero' onClick={() => handleBuy()} className='m-2 bg-orange-600 text-white border-white'>Buy</button>
                    </Link>
                </div> : "" }
            </div>





        </div>

    )
}

export default Products



