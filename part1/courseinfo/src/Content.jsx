   
import Part from './Part';

const Content = ({items}) =>{
    return(
        <>
            <Part item = {items[0]}/>
            <Part item = {items[1]}/>
            <Part item = {items[2]}/>
        </>
    );
}
export default Content

