import s from './App.module.scss';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//api
import { getProfile } from './api/Api';
//slice
import { setUser } from './redux/user/slice';
import { setSearchQuery } from './redux/filters/slice';
//components
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';
import Create from './pages/Create/Create';





const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('searchQueryBills', '')
        dispatch(setSearchQuery(''))

        getProfile()
            .then(res => {
                const data = res.data.data;
                dispatch(setUser(data))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div id='scrollableDiv' className={s.root}>
            <Routes>
                <Route path='/'
                    element={<List />}
                />

                <Route path='/create'
                    element={<Create />}
                />
                <Route path='/detail/:id'
                    element={<Detail />}
                />

            </Routes>
        </div>

    )
}

export default App;