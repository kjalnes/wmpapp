import React from 'react';
import OverviewTable from '../OverviewTable'
import ImportantMessage from './ImportantMessage';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { Icon } from 'semantic-ui-react';


const Letter2 = ({ classRole, exchangeClass, materials }) => {
    const letterURL = materials && materials.letter2;
    const instructionsURL = materials && materials.instruction2;

    return (
        <div>
            <h2>Materials Letter 2</h2>
            <p>Download and print the letter template.</p>
            <p>You can download the instructions for letter 2 as well, or you can follow the instructions below for writing and sending the first letter.</p>
            <div>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button download'>
                        <Icon name='download'/>Letter 2 Template
                    </button>
                </a>
                <a href={instructionsURL} target='_blank'>
                    <button className='roll-button download'>
                        <Icon name='download'/>Letter 2 Instructions
                    </button>
                </a>
            </div>
            <h2>Instructions Letter 2</h2>
            <ImportantMessage classRole={classRole} />
            <OverviewTable letterName='letter2' />
            <Step1 classRole={classRole} />
            <Step2 />
            <Step3 exchangeClass={exchangeClass} />
            <Step4 />
        </div>
    );
}


export default Letter2;
