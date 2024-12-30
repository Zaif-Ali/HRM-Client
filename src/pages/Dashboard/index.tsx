import { BlurFade } from '@/components/ui/blur-fade';
import { Label } from '@/components/ui/label';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FlagTriangleRight,
  Inbox,
  LucideIcon,
  PersonStanding,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Label as RechartLabel,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const Sections: {
    Icon: LucideIcon;
    title: string;
    count: number;
    description: string;
  }[] = [
    {
      Icon: PersonStanding,
      title: 'Total Employees',
      count: 20,
      description: 'Total number of employees in your company',
    },
    {
      Icon: FlagTriangleRight,
      title: 'Today Logged',
      count: 19,
      description: 'Number of employees logged in today',
    },
    {
      Icon: Inbox,
      title: 'Pending Requests',
      count: 1,
      description: 'Pending requests whose waiting for approval',
    },
  ];
  const meetings = [
    {
      day: 'Today',
      meetings: [
        {
          time: '10:00 PM',
          title: 'Regarding CRM',
          description: 'Team Meeting',
          leftMembers: 5,
          members: [
            {
              image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

              fallback: 'HM',
            },
            {
              image:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

              fallback: 'SS',
            },
            {
              image:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              fallback: 'UU',
            },
          ],
        },
      ],
    },
    {
      day: 'Tomorrow',
      meetings: [
        {
          time: '11:00 PM',
          title: 'Salary Hike',
          description: 'Regarding Salary Hike',
          leftMembers: 0,
          members: [
            {
              image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              fallback: 'HM',
            },
          ],
        },
        {
          time: '01:00 AM',
          title: 'Regarding CRM',
          description: 'Team Meeting',
          leftMembers: 5,
          members: [
            {
              image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

              fallback: 'HM',
            },
            {
              image:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

              fallback: 'SS',
            },
            {
              image:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              fallback: 'UU',
            },
          ],
        },
      ],
    },
  ];
  const chartData = [{ month: 'january', accepted: 1260, rejected: 570 }];
  const chartConfig = {
    desktop: {
      label: 'accepted',
      color: 'hsl(var(--chart-1))',
    },
    mobile: {
      label: 'rejected',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;
  const totalVisitors = chartData[0].accepted + chartData[0].rejected;
  return (
    <React.Fragment>
      <main className="flex flex-col xl:flex-row gap-4">
        <section className="xl:w-3/5">
          <BlurFade delay={0.25} inView>
            <Label className="text-3xl sm:text-3xl text-pretty tracking-tighter xl:text-4xl">
              Hello Huzaifa 👋
            </Label>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <span className="text-xl font-normal sm:text-xl xl:text-lg/none">
              Nice to meet you again!
            </span>
          </BlurFade>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 ">
            {Sections.map((section, sectionIndex) => {
              return (
                <BlurFade
                  delay={0.25 + 0.25 * sectionIndex}
                  inView
                  key={sectionIndex}
                >
                  <Card
                    className="flex flex-col group shadow-none hover:shadow-2xl transition-shadow duration-300 ease-in-out hover:cursor-pointer bg-blue-600 dark:bg-blue-700 text-secondary dark:text-foreground h-52"
                    key={sectionIndex}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg ">
                        <section.Icon className="mr-2 mb-2 h-5 w-5 text-secondary dark:text-foreground" />
                        {section.title}
                      </CardTitle>
                      <CardDescription className="text-secondary dark:text-foreground line-clamp-2">
                        {section.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-xl font-bold">{section.count}</p>
                    </CardContent>
                  </Card>
                </BlurFade>
              );
            })}
          </div>
          <section className="w-full lg:w-1/2 my-2">
            <div className="">
              <BlurFade delay={0.25} inView>
                <Card className="flex flex-col border h-64 bg-background ">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Request Chart</CardTitle>
                    <CardDescription className="text-center">
                      January 2025
                      <div className="leading-4 text-muted-foreground">
                        Showing total accepted and rejected requests of this
                        month
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 items-center pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-full max-w-[250px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                      >
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <RechartLabel
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                'cx' in viewBox &&
                                'cy' in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) - 16}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 4}
                                      className="fill-muted-foreground"
                                    >
                                      Requests
                                    </tspan>
                                  </text>
                                );
                              }
                              return null;
                            }}
                          />
                        </PolarRadiusAxis>
                        <RadialBar
                          dataKey="rejected"
                          stackId="a"
                          cornerRadius={5}
                          fill="var(--color-desktop)"
                          className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                          dataKey="accepted"
                          fill="var(--color-mobile)"
                          stackId="a"
                          cornerRadius={5}
                          className="stroke-transparent stroke-2"
                        />
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 "></CardFooter>
                </Card>
              </BlurFade>
            </div>
          </section>
        </section>
        <section className="xl:w-1/2 ">
          <div className="">
            <BlurFade delay={0.25} inView>
              <Card className="bg-background border-none shadow-none">
                <CardHeader className="p-4">
                  <CardTitle className="text-xl">Upcoming Meetings</CardTitle>
                  <CardDescription className="text-sm">
                    This is a list of all upcoming meetings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  {meetings.map((EachDay, index) => {
                    return (
                      <BlurFade
                        delay={0.25 + 0.25 * index}
                        inView
                        className="px-2"
                        key={index}
                      >
                        <Label className="text-sm text-muted-foreground font-medium">
                          {EachDay.day}
                        </Label>
                        {EachDay.meetings.map((meeting, meetingIndex) => {
                          return (
                            <BlurFade delay={0.25 + 0.25 * meetingIndex} inView key={meetingIndex}>
                              <div
                                className="md:grid grid-cols-6 row-span-1 gap-6 mt-3 border rounded-md p-2 bg-secondary cursor-pointer"
                                key={meetingIndex}
                              >
                                <div className="col-span-4 flex items-center space-x-2">
                                  <Label className="text-base w-20 font-medium">
                                    {meeting.time}
                                  </Label>
                                  <div className="flex items-center space-x-3">
                                    <Separator
                                      orientation="vertical"
                                      className="bg-blue-500 w-0.5 h-6 rounded-lg"
                                    />
                                    <div className="space-y-2">
                                      <p className="text-sm text-foreground font-medium leading-none">
                                        {meeting.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground leading-none">
                                        {meeting.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="hidden  col-span-2 md:flex items-center space-x-2">
                                  <Separator
                                    orientation="vertical"
                                    className="bg-blue-500 w-0.5 h-6 rounded-lg"
                                  />
                                  <div className="flex items-center -space-x-4 rtl:space-x-reverse">
                                    {meeting.members.map((member, index) => {
                                      return (
                                        <Avatar
                                          className="w-7 h-7 rounded-full"
                                          key={index}
                                        >
                                          <AvatarImage src={member.image} />
                                          <AvatarFallback>
                                            {member.fallback}
                                          </AvatarFallback>
                                        </Avatar>
                                      );
                                    })}
                                    {meeting.leftMembers > 0 && (
                                      <div className="z-30 flex items-center justify-center w-8 h-8 text-xs font-medium text-muted dark:text-primary bg-blue-500  border-2 border-secondary rounded-full">
                                        +{meeting.leftMembers}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </BlurFade>
                          );
                        })}
                      </BlurFade>
                    );
                  })}
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};
export default Dashboard;
