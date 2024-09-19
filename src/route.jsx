
import Home from "./views/scrapping/Scrapping";
import ScrapingDetails from "./views/detail/scrapingDetails";
const routes = [
    { path: '/', state: true, element: <Home /> },
    { path: '/details/:id', state: true, element: <ScrapingDetails /> },


]


export default routes;