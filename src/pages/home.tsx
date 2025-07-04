import { Breadcrumb, BreadcrumbListType } from "@/components/atoms/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig
const listaItensBreadcrumb: BreadcrumbListType[] = [{ titulo: "Home" }]

export function Home() {
	return (
		<div className='flex flex-1 flex-col w-full gap-4'>
			<Breadcrumb listaItens={listaItensBreadcrumb} />

			<section className="flex flex-col gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Bar Chart - Multiple</CardTitle>
						<CardDescription>January - June 2025</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="max-h-96 w-full">
							<BarChart accessibilityLayer data={chartData}>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent indicator="dashed" />}
								/>
								<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
								<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2 text-sm">
						<div className="flex gap-2 font-medium leading-none">
							Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="leading-none text-muted-foreground">
							Showing total visitors for the last 6 months
						</div>
					</CardFooter>
				</Card>
			</section>
		</div>
	)
}
