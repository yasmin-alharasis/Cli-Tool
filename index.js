#!/usr/bin/env node
import inquirer from 'inquirer';
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Please enter course title',
    },
    {
        type: 'number',
        name: 'price',
        message: 'Please enter course price',
    }
]

const filePath = './courses.json';

program
    .name('cli maneger')
    .description('CLI')
    .version('1.0.0');

program
    .command('add')
    .alias('a')
    .description('Add a course')
    .action(()=>{
        inquirer
            .prompt(questions)
            .then((answers) =>{
                console.log(answers)
                if(fs.existsSync(filePath)){
                    fs.readFile(filePath,'utf-8',(err,fileContent) => {
                        if(err) {
                            console.log('err read file',err);
                            process.exit();
                        }
                        console.log('fileContent',fileContent);
                        const fileContentAsJson = JSON.parse(fileContent);
                        fileContentAsJson.push(answers);
                        fs.writeFile(filePath, JSON.stringify(fileContentAsJson),'utf-8',()=>{
                            console.log('Add course Done');
                        })
                    })
                }else{
                    fs.writeFile(filePath,JSON.stringify([answers]),'utf-8',()=>{
                        console.log('Add Course at first time Done')
                    })
                }
            })
    })
program
    .command('list')
    .alias('l')
    .description('list all courses')
    .action(()=>{ 
        fs.readFile(filePath,'utf-8',(err,content)=>{
            if(err) {
                console.log('Error: ', err);
                process.exit()
            }
            console.table(JSON.parse(content));
        })
    })

program.parse(process.argv)
