"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const SeviceCenter = () => {
    const brandToAreasMap = {
        apple: ["Andheri", "Bandra", "Colaba", "Vashi", "Panvel"],
        samsung: ["Powai", "Goregaon", "Malad", "Vashi", "Panvel", "Thane"],
    };

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryBrand = searchParams.get("brand");
    const queryArea = searchParams.get("area");

    const [brand, setBrand] = useState("Choose Brand");
    const [area, setArea] = useState("Choose Area");
    const [mapURL, setMapURL] = useState("");
    const [error, setError] = useState("");

    // Sync query params with the state
    useEffect(() => {
        if (queryBrand) setBrand(queryBrand);
        if (queryArea) setArea(queryArea);
    }, [queryBrand, queryArea]);

    function generateMapURL(brand, area) {
        const apiKey = 'AIzaSyBJvu_OJZWC5_ufsXiEcyM9-bX_EXUwgQ8'; // Replace with your Google Maps API key
        return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${brand}+${area}`;
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (brand === 'Choose Brand' || area === 'Choose Area') {
          setError('Please select both brand and area.');
          return;
      }
      setError('');
      const newMapURL = generateMapURL(brand, area);
      setMapURL(newMapURL);
      
     
  }
  

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 relative">
    <Label htmlFor="brand" className="mb-3">
        Choose Brand
    </Label>
    <Select
        onValueChange={(value) => {
            setBrand(value);
            setArea('Choose Area');
        }}
        value={brand !== 'Choose Brand' ? brand : ''}
    >
        <SelectTrigger>
            <SelectValue>
                {brand !== 'Choose Brand' ? brand : <span className="text-gray-400">Select a Brand</span>}
            </SelectValue>
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="samsung">Samsung</SelectItem>
            <SelectItem value="oppo">Oppo</SelectItem>
            <SelectItem value="panasonic">Panasonic</SelectItem>
            <SelectItem value="boat">Boat</SelectItem>
            <SelectItem value="vivo">Vivo</SelectItem>
            <SelectItem value="motorola">Motorola</SelectItem>
        </SelectContent>
    </Select>
</div>


                    <div className="flex flex-col gap-2 relative">
                        <Label htmlFor="area" className="mb-3">
                            Choose Area
                        </Label>
                        <Select
                            onValueChange={(value) => setArea(value)}
                            value={area}
                            disabled={brand === 'Choose Brand'}
                        >
                            <SelectTrigger>
                                {/* <SelectValue placeholder="Choose Area" /> */}
                                <SelectValue>
                {brand !== ' Choose Area' ? 'Choose Area' : <span className="text-gray-400">Select a area</span>}
            </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {brand !== 'Choose Brand' &&
                                    brandToAreasMap[brand]?.map((area) => (
                                        <SelectItem key={area} value={area}>
                                            {area}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mt-5 flex justify-center gap-4">
                <Button
        className="mx-5"
        onClick={() => {
            setBrand('Choose Brand');
            setArea('Choose Area');
            setMapURL('');
            // setError('');
        }}
    >
        Reset
    </Button>


                    <Button className="mx-5" type="submit">
                        Submit
                    </Button>
                </div>
            </form>

            {error && <p className="text-red-500">{error}</p>}
            {mapURL && (
                <div className="mt-5">
                    <iframe
                        title="Service Center Map"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        src={mapURL}
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <Toaster />
        </>
    );
};

export default SeviceCenter;
