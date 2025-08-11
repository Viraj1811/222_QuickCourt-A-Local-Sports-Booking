
"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';


const timeSlots = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`); // 8 AM to 9 PM

export default function TimeSlotManagementPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedCourt, setSelectedCourt] = useState('1');
    // In a real app, blocked slots would be fetched from a DB
    const [blockedSlots, setBlockedSlots] = useState<Record<string, string[]>>({
        '2024-08-20': ['14:00', '15:00'] // Example
    });

    const handleSlotClick = (slot: string) => {
        const dateString = date?.toISOString().split('T')[0];
        if (!dateString) return;

        setBlockedSlots(prev => {
            const newBlockedSlots = { ...prev };
            const daySlots = newBlockedSlots[dateString] || [];
            
            if (daySlots.includes(slot)) {
                // Unblock slot
                newBlockedSlots[dateString] = daySlots.filter(s => s !== slot);
            } else {
                // Block slot
                newBlockedSlots[dateString] = [...daySlots, slot];
            }
            return newBlockedSlots;
        });
    };
    
    const dateString = date?.toISOString().split('T')[0] || '';
    const currentBlockedSlots = blockedSlots[dateString] || [];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold font-headline">Time Slot Management</h1>
                <p className="text-muted-foreground">Set court availability and block specific time slots for maintenance or events.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Select Date & Court</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border p-0"
                                disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                            <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a court" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Clay Court 1 (Tennis)</SelectItem>
                                    <SelectItem value="2">Hard Court 2 (Tennis)</SelectItem>
                                    <SelectItem value="3">Indoor Court A (Badminton)</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Availability</CardTitle>
                            <CardDescription>Click a time slot to block or unblock it for the selected date and court.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                {timeSlots.map(slot => {
                                    const isBlocked = currentBlockedSlots.includes(slot);
                                    return (
                                        <Button
                                            key={slot}
                                            variant={isBlocked ? "destructive" : "outline"}
                                            className={cn("h-14 flex-col", isBlocked && "text-destructive-foreground bg-destructive")}
                                            onClick={() => handleSlotClick(slot)}
                                        >
                                            <span className="font-bold">{slot}</span>
                                            <div className="flex items-center text-xs">
                                                {isBlocked ? <Lock className="mr-1 h-3 w-3" /> : <Unlock className="mr-1 h-3 w-3" />}
                                                {isBlocked ? 'Blocked' : 'Available'}
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
