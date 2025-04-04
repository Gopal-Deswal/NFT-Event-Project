
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Users, Image, Info, Phone, IdCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

// Define form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Event title must be at least 3 characters" }),
  date: z.string().min(1, { message: "Event date is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  description: z.string().min(10, { message: "Please provide a more detailed description" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  hostMobile: z.string()
    .min(10, { message: "Mobile number must be 10 digits" })
    .max(10, { message: "Mobile number must be 10 digits" })
    .regex(/^[6-9]\d{9}$/, { message: "Please enter a valid Indian mobile number" }),
  aadhaarConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to provide Aadhaar verification"
  }),
});

const AddEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      location: "",
      description: "",
      capacity: "",
      imageUrl: "",
      hostMobile: "",
      aadhaarConsent: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real application, we would save this data to a database
    console.log("Form values:", values);
    
    toast({
      title: "Event Created",
      description: "Your event has been successfully created. Aadhaar verification pending.",
    });
    
    setTimeout(() => {
      navigate('/events');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="border-b-2 border-purple pb-1">Add New Event</span>
            </h1>
            <p className="text-gray-600">Create a new event with NFT-powered ticketing</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>
                Fill in the information below to create your event
              </CardDescription>
            </CardHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input type="date" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="Event venue & city" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your event" rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attendee Capacity</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input type="number" min="1" placeholder="Max number of attendees" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Image URL</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Image className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="Image URL" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Host Information Section */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-medium mb-4">Host Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="hostMobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input 
                                placeholder="10-digit mobile number" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter a valid 10-digit Indian mobile number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="mt-4">
                      <Label htmlFor="aadhaarUpload" className="block mb-2">Aadhaar Card Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <IdCard className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 mb-2">Upload your Aadhaar card for identity verification</p>
                        <Input 
                          id="aadhaarUpload" 
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png" 
                          className="mt-2" 
                        />
                        <p className="text-xs text-gray-400 mt-2">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="aadhaarConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal">
                              I consent to share my Aadhaar for verification as required by Indian regulations
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                    <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                    <p>
                      This is a prototype. In a production app, we would implement secure Aadhaar verification 
                      and comply with all Indian data protection regulations.
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/events')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-purple hover:bg-purple-dark text-white"
                  >
                    Create Event
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddEvent;
