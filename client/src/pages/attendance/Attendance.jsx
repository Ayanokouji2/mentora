import React from 'react'
import AppLayout from '../../_components/layout/AppLayout'
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { StudentTable } from './StudentTable';

const Attendance = () => {
  return (
    <AppLayout>
        <div>
            attendance
            <Input/>
            <Progress value={69}/>
            <StudentTable/>
            <StudentTable/>
            <StudentTable/>

            <StudentTable/>


        </div>
    </AppLayout>
  )
}

export default Attendance