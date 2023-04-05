import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import SearchBar from '../../components/Searchbar/Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';
import Paginated from "../../components/Paginated/Paginated";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { 
  getGames, 
  getGenres, 
  filterByGenres, 
  getPlatforms, 
  filterByPlatforms,
  orderByName,
  orderByRating,
  orderByPrice,
  clearDetail, 
  emailUserE,
  clearUserEmail
} from "../../redux/actions";

const Home = () => {

    const dispatch = useDispatch();
    const allGames = useSelector(state => state.allGames);
    const users = useSelector((state) => state.userEmail)
    const { user, isAuthenticated } = useAuth0();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const history = useHistory();
    const allUsers = useSelector((state) => state.allUsers);

    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [gamesPerPage, setGamesPerPage] = useState(9)
    const indexOfLastGame = currentPage * gamesPerPage // 10
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // 0
    const currentGames = allGames.slice(indexOfFirstGame,indexOfLastGame)

    const [pageLoaded, setPageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    } 

    const currentPageColor =  currentPage      
    
    useEffect(() => {
        dispatch(getGenres());
    },[] );

    useEffect(() => {
        dispatch(getPlatforms());
    },[] );

    useEffect(() => {
        
      dispatch(getGames())
        .then((response) => {
          setIsLoading(true);
          setPageLoaded(true); // Indicamos que la página ha cargado completamente
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          setError(true);
        });
      dispatch(clearDetail());
    }, []);
      
    function handleGenreFilter(e) {
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handlePlatformFilter(e) {
        dispatch(filterByPlatforms(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderPrice(e){
        e.preventDefault();
        dispatch(orderByPrice(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSearch() {
        setCurrentPage(1);
    }

    // useEffect(() => {   
    //     if(isAuthenticated) {
    //         dispatch(clearUserEmail());
    //         dispatch(emailUserE(user.email))            
    //         if(users && user.email === users.email) {
    //             history.push("/");
    //         } else {
    //             axios.post(`http://localhost:3001/user/`, { email: user.email });
    //             history.push("/");
    //         }
    //     }
    // },[isAuthenticated, dispatch, history]);

    
// Función para obtener el usuario actual
const getCurrentUser = () => {
    if (isAuthenticated && allUsers) {
      return allUsers.find((u) => u.email === user.email);
    }
    return null;
  };
  
  const currentUser = getCurrentUser();
  
  
  useEffect(() => {
    if (currentUser && !currentUser.active) {
      history.push('/banneduser');
    }
  }, [currentUser, history]);



    useEffect(() => {   
        if(isAuthenticated) {
          dispatch(clearUserEmail());
          dispatch(emailUserE(user.email));
          if (user.active === false) {
            history.push("/banneduser");
          } else if(users && user.email === users.email) {
            history.push("/");
          } else {
            axios.post(`http://localhost:3001/user/`, { email: user.email });
            history.push("/");
          }
        }
      },[isAuthenticated, dispatch, history, user]);
      

    return (
        <div className={styles.Background}>
            <div>           
                <div >
                  <Paginated
                  gamesPerPage={gamesPerPage}
                  allGames={allGames.length}
                  paginado={paginado}
                  currentPageColor={currentPageColor}
                  />
                </div>
                <div className={styles.search}>
                  <SearchBar  setCurrentPage={handleSearch}/>
                 </div>
                <div className={styles.containerFilters}>
                <select onChange={(e) => handleGenreFilter(e)} className={styles.filter}>
                     <option value='All'>All Genres</option>
                    {genres.slice(0, 15).map((gen, index) => {
                        return <option key={index} value={gen.name}>{gen.name}</option>;
                     })}
                </select> 

                <select onChange={(e) => handlePlatformFilter(e)} className={styles.filter}>
                     <option value='All'>All Platforms</option>
                    {platforms.filter(plat => plat.name !== 'Neo Geo' && plat.name !== 'Game Gear' && plat.name !== 'Jaguar'&& plat.name !== '3DO' && plat.name !== 'SEGA Master System'&& plat.name !== 'SEGA CD' && plat.name !== 'SEGA Saturn'&& plat.name !== 'Genesis' && plat.name !== 'SEGA 32X'&& plat.name !== 'Atari XEGS' && plat.name !== 'Atari Lynx'&& plat.name !== 'Atari ST' && plat.name !== 'Atari 8-bit'&& plat.name !== 'Atari 2600' && plat.name !== 'Atari 5200'&& plat.name !== 'Atari 7800' && plat.name !== 'Commodore / Amiga'&& plat.name !== 'Atari Flashback'&& plat.name !== 'Apple II' && plat.name !== 'Classic Macintosh'&& plat.name !== 'NES' && plat.name !== 'SNES'&& plat.name !== 'Game Boy' && plat.name !== 'Game Boy Color'&& plat.name !== 'Game Boy Advance' && plat.name !== 'Nintendo 64'&& plat.name !== 'GameCube' && plat.name !== 'PSP'&& plat.name !== 'Nintendo DSi' && plat.name !== 'Nintendo DS').map((plat, index) => {
                        return <option key={index} value={plat.name}>{plat.name}</option>;
                     })}
                </select>

            {/* <select onChange={(e) => handlePlatformFilter(e)} className={styles.filter}>
    <option value='All'>All Platforms</option>
    {platforms.filter(plat => plat.name !== 'Xbox' && plat.name !== 'PlayStation' && plat.name !== 'Nintendo Switch')
              .map((plat, index) => {
                  return <option key={index} value={plat.name}>{plat.name}</option>;
              })}
</select> */}

            <select onChange={(e) => handleOrderName(e)} className={styles.filter}>
                     <option value='All'>Alphabetical Order</option>
                     <option value= 'Asc' >Ascending Alphabetical Order</option>
                    <option value= 'Desc'>Descending Alphabetical Order</option>
                </select>

               <select onChange={(e) => handleOrderRating(e)} className={styles.filter}>
                     <option value='All'>Rating Order</option>
                     <option value= 'Asc' >Ascending Rating Order</option>
                    <option value= 'Desc'>Descending Rating Order</option>
                </select>

                <select onChange={(e) => handleOrderPrice(e)} className={styles.filter}>
                     <option value='All'>Price Order</option>
                     <option value= 'Asc' >Ascending Price Order</option>
                    <option value= 'Desc'>Descending Price Order</option>
                </select>
                </div>     
                <div className={styles.containerCards}>
                {currentGames.length > 0 ?
                      currentGames?.map ((el) =>{
                      return(
                        <CardsContainer name={el.name} image={el.image} id={el.id} price={el.price} key={el.id} />
                      )}) : 
                      <div>      {isLoading && pageLoaded ?          
                        (
                            //   alert('Error al cargar los juegos. Por favor, intente nuevamente más tarde')
                            Swal.fire({
                                html: '<div style="max-height: 450px;"><img src="https://th.bing.com/th/id/R.3a99edb590b04351599a12c400aa294b?rik=TVlBsEI1Zi6S3w&amp;pid=ImgRaw&amp;r=0" alt="Custom image" class="custom-image-class" style="width:100%;height:100%;" /><br><br><p style="color:white;">The wanted videogame does not exist.</p></div>',
                                background: '#000000',
                                backdrop: 'rgba(0, 0, 0, 0.8)',
                                confirmButtonColor: '#ff0000',
                                confirmButtonText: 'Try again',
                            }).then(() => {
                                location.reload();
                            })
                          )  
                          :
                        <p className={styles.img} ><span className={styles.loader}></span></p>
                    }
                      </div>
                     
                      }  
                </div>
   
                 <Paginated
                  gamesPerPage={gamesPerPage}
                  allGames={allGames.length}
                  paginado={paginado}
                  currentPageColor={currentPageColor}
                  />
            </div>
        </div>
    );
};

export default Home;