import React from 'react';
import {Labels} from '../../constants';
import StepZilla from 'react-stepzilla';
import SamplePage from '../login/SamplePage';

class StudentLessonPage extends React.Component {
  render() {
    const steps =
      [
        {name: 'Step 1', component: <SamplePage />},
        {name: 'Step 2', component: <SamplePage />},
        {name: 'Step 3', component: <SamplePage />},
        {name: 'Step 4', component: <SamplePage />},
        {name: 'Step 5', component: <SamplePage />}
      ];

    return (
      <div>
        <h1>{Labels.student.lesson_page.title}</h1>
        <div className='step-progress'>
          <StepZilla steps={steps}/>
        </div>
      </div>
    );
  }
}

export default StudentLessonPage;
