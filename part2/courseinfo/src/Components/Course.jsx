import Header from "./Header";
import Content from "./Content";

const Course = ({course}) =>{
    console.log(course);
    return (
        <>
            <Header header={course.name}></Header>
            <Content parts={course.parts}></Content>
        </>
    )
}

export default Course;